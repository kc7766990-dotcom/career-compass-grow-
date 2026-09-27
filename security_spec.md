# Career Compass Security Specification

## 1. Data Invariants
1. **User Isolation**: A user can only read, write, or list documents residing in their own path hierarchy `/users/{userId}/**` where `{userId} == request.auth.uid`.
2. **Identity Integrity**: For every write to `/users/{userId}` or its subcollections, the incoming payload's `userId` field must match `request.auth.uid`.
3. **No Blanket Reads**: All list and get operations are guarded such that users cannot access records belonging to other users or read unscoped collections.
4. **Denial of Wallet Protection**: Strings are constrained with `.size() <= MAX` (e.g. 100-4000 characters) and IDs must match alphanumeric patterns `^[a-zA-Z0-9_\-]+$` with `.size() <= 128`.
5. **No Orphaned Records**: Subcollection documents (`roadmaps`, `taskProgress`, `weeklySchedules`, `chatMessages`) strictly belong to their authenticated parent user path.

## 2. The "Dirty Dozen" Payloads (Designed to Break Security Boundaries)
1. **Unauthenticated Read to /users/{userId}**: Anonymous attacker attempts to fetch another user's profile without auth. Expected: `PERMISSION_DENIED`.
2. **Cross-User Profile Spoof**: User `uid_A` attempts to write to `/users/uid_B` with `{ "userId": "uid_B" }`. Expected: `PERMISSION_DENIED`.
3. **Identity Impersonation in Payload**: User `uid_A` writes to `/users/uid_A` with `{ "userId": "uid_B" }`. Expected: `PERMISSION_DENIED`.
4. **ID Poisoning Attack**: User attempts to create a document with a 50KB junk character ID `/users/uid_A/roadmaps/{junk_id}`. Expected: `PERMISSION_DENIED` via `isValidId()`.
5. **Massive Payload Resource Exhaustion**: User writes 2MB string into `text` in `chatMessages`. Expected: `PERMISSION_DENIED` via `.size() <= 4000`.
6. **Shadow Field Injection**: User attempts to inject `{ "isAdmin": true, "superUser": true }` into `UserProfile`. Expected: `PERMISSION_DENIED` via key validation.
7. **Cross-User Subcollection Read**: User `uid_A` queries `/users/uid_B/roadmaps`. Expected: `PERMISSION_DENIED`.
8. **Cross-User Task Completion Hijack**: User `uid_A` modifies `/users/uid_B/taskProgress/task-1`. Expected: `PERMISSION_DENIED`.
9. **Unauthenticated Message Injection**: Attacker sends a POST/write directly to `/users/{userId}/chatMessages` without a verified token. Expected: `PERMISSION_DENIED`.
10. **Global Unscoped Listing**: Attacker queries `/users` collection directly to dump all registered developers. Expected: `PERMISSION_DENIED`.
11. **Type Poisoning**: Attacker sends `{ "completed": "not-a-boolean" }` to `taskProgress`. Expected: `PERMISSION_DENIED` via type check.
12. **Negative Phase Number**: Attacker passes `{ "phaseNumber": -99 }` in roadmap tasks. Expected: `PERMISSION_DENIED`.

## 3. Security Rules Summary
The firestore rules enforce:
- `rules_version = '2';`
- Default deny: `match /{document=**} { allow read, write: if false; }`
- Granular matching on `/users/{userId}`, `/users/{userId}/roadmaps/{roadmapId}`, `/users/{userId}/taskProgress/{taskId}`, `/users/{userId}/weeklySchedules/{scheduleId}`, and `/users/{userId}/chatMessages/{messageId}`.
- All checks verify `isSignedIn() && request.auth.uid == userId`.
