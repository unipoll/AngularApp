import { MemberListModel } from "./member.model";

export interface GroupModel {
    id: string;
    name: string;
    description: string;
    members: MemberListModel
}

export interface GroupListModel {
    groups: GroupModel[];
}