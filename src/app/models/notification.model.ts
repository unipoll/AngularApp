export interface NotificationModel{
    recipient_id: string, 
    timestamp: Date, 
    message: {
        message: string
    }
}