import { Request } from 'express';
import { JoinRequest, Member } from '../generated/prisma';

interface emitNewJoinRequestPayload extends JoinRequest {
  user: {
    username: string;
    image: string | null;
  };
}

interface newGroupMemberInterface extends Member {
  user: {
    username: string;
    image: string | null;
  };
}

export const emitNewJoinRequest = (
  req: Request,
  groupId: string,
  payload: emitNewJoinRequestPayload
): void => {
  req.app
    .get('io')
    .to(`group-${groupId}`)
    .emit(`group-${groupId}:request-new`, payload);
};

export const emitDeleteJoinRequest = (
  req: Request,
  groupId: string,
  payload: {
    id: string;
  }
): void => {
  req.app
    .get('io')
    .to(`group-${groupId}`)
    .emit(`group-${groupId}:request-delete`, payload);
};

export const emitNewGroupMember = (
  req: Request,
  groupId: string,
  event: newGroupMemberInterface
): void => {
  req.app
    .get('io')
    .to(`group-${groupId}`)
    .emit(`group-${groupId}:member-new`, {
      event,
    });
};
