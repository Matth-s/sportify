import { Router } from 'express';
import { createJoinRequestController } from '../controllers/join-request/create-join-request-controller';
import { joinGroupController } from '../controllers/join-request/join-request-controller';
import { deleteJoinRequestController } from '../controllers/join-request/delete-join-request-controller';

const router = Router({
  mergeParams: true,
});

router.post('/new-request', createJoinRequestController);
router.post('/join', joinGroupController);
router.delete('/delete-request', deleteJoinRequestController);

export default router;
