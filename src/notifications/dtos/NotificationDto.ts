export interface NotificationDto {
    title: string;
    text: string;
    userEmail: string;
    datetime: Date;
    routerLink: string | undefined;
    buttonText: string | undefined;
}
