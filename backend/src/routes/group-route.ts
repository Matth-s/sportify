import { Router } from 'express';
import { createGroupController } from '../controllers/groups/create-group-controller';
import { getGroupController } from '../controllers/groups/get-group-controller';

import joinGroupRequest from './group-join-request';

const router = Router();

router.use('/:groupId/join-request', joinGroupRequest);

router.get('/', getGroupController);
router.post('/new-group', createGroupController);

export default router;
