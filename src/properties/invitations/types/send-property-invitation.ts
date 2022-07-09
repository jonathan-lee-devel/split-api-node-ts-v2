export type SendPropertyInvitationFunction = (
    propertyInvitationTokenValue: string,
    inviterEmail: string,
    inviteeEmail: string,
) => Promise<void>;
