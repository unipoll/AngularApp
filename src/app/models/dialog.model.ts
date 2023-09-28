export interface DialogCreateModel {
    resource_type: string
    workspace_id: string
    name: string;
    description: string;
}

export interface DialogUpdateModel {
    resource_type: string
    workspace_id: string
    id: string
    name: string;
    description: string;
}