export type EmailType =
  | "AddToNewsletter"
  | "RemoveFromNewsletter"
  | "InviteToOrganization"
  | "VerifyEmail";

export enum EmailTypeEnum {
  AddToNewsletter = "AddToNewsletter",
  RemoveFromNewsletter = "RemoveFromNewsletter",
  InviteToOrganization = "InviteToOrganization",
  VerifyEmail = "VerifyEmail",
}
