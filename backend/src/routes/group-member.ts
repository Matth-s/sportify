import { Router } from 'express';
import { getGroupMemberController } from '../controllers/group-members/get-group-member-controller';
import { requiredUserInGroup } from '../middlewares/required-user-in-group';

const router = Router({
  mergeParams: true,
});

// le user doit faire partie du groupe
router.use(requiredUserInGroup);

router.get('/', getGroupMemberController);

export default router;
