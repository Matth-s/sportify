import { Router } from 'express';
import { createJoinGroupController } from '../controllers/join-request/create-join-request-controller';
import { deleteJoinRequestController } from '../controllers/join-request/delete-join-request-controller';
import { getJoinRequestController } from '../controllers/join-request/get-join-request-controller';
import { requiredUserInGroup } from '../middlewares/required-user-in-group';
import { requiredGroupAdminOrModerator } from '../middlewares/required-group-admin-moderator';
import { declineJoinRequestController } from '../controllers/join-request/decline-join-request-controller';
import { acceptJoinRequestController } from '../controllers/join-request/accept-join-request-controller';

/* 
  Route des demandes d adhesion
*/

const router = Router({
  mergeParams: true,
});

router.get('/', [requiredUserInGroup], getJoinRequestController);

router.post(
  '/accept/:joinRequestId',
  [requiredGroupAdminOrModerator],
  acceptJoinRequestController
);

router.post('/new-request', createJoinGroupController);
router.delete('/delete-request', deleteJoinRequestController);

router.delete(
  '/reject/:joinRequestId',
  [requiredGroupAdminOrModerator],
  declineJoinRequestController
);

export default router;
