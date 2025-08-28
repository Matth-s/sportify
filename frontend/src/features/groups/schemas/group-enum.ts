import z from "zod";
import { JoinMode, SportPracticed } from "../types/group-enum-type";

export const groupJoinMode = z.enum(JoinMode);
export const sportEnum = z.array(z.enum(SportPracticed));
