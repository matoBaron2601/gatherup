'use server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { actionClient } from "@/lib/safeAction";

import { dayBlockers } from '@/db/schema'
import { replaceDayBlockersSchema } from '../schemas/dayBlocker';
import db from '@/db';


export const updateUser = actionClient.