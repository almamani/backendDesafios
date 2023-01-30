import twilio from "twilio";
import * as dotenv from "dotenv";
dotenv.config();

const accountSID = "AC6f9959a5b7147535098cff754ff1b668";
const authToken = "586f3d1b65ff631038ba6a6068982127";

export const client = twilio(accountSID, authToken);
