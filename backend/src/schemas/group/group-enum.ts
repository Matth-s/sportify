import z from 'zod';
import { JoinMode, Sport } from '../../generated/prisma';

export const groupJoinMode = z.enum(JoinMode);
export const sportEnum = z.array(z.enum(Sport));
