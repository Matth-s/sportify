import { Router } from 'express';
import { createGroupController } from '../controllers/groups/create-group-controller';
import { getGroupController } from '../controllers/groups/get-group-controller';
import { getGroupByIdController } from '../controllers/groups/get-group-by-id-controller';
import { requiredUserInGroup } from '../middlewares/required-user-in-group';

import joinGroupRequestRoute from './group-join-request';
import groupMemberRoutes from './group-member';

const router = Router({
  mergeParams: true,
});

router.use('/:groupId/join-request', joinGroupRequestRoute);
router.use('/:groupId/member', groupMemberRoutes);

router.get('/', getGroupController);
router.post('/new-group', createGroupController);

// require user in group

router.get(
  '/:groupId',
  [requiredUserInGroup],
  getGroupByIdController
);

export default router;
