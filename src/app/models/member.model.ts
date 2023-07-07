export interface MemberModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
}

export interface MemberListModel {
  members: MemberModel[];
}