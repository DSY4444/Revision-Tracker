import { PrismaClient } from "@prisma/client";
require("dotenv").config();


const prisma = new PrismaClient();
export default prisma;