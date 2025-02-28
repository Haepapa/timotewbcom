import { Client } from "appwrite";

const client = new Client();
const projectID = import.meta.env.VITE_AW_PROJECT_ID ?? "";
const endpointURL = import.meta.env.VITE_AW_URL_ENDPOINT ?? "";

client.setEndpoint(endpointURL).setProject(projectID);
