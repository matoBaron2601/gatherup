import { Separator } from "@/components/ui/separator";
import db from "@/db";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import DateBlockerForm from "@/components/blockersForm";
import { getAuthenticatedUser } from "@/lib/server/fetch/user";
import { getPersonalBlockersByUserEmail } from "@/lib/server/fetch/personalBlocker";

const PersonalBlockersPage = async () => {
  const user = await getAuthenticatedUser();
  const userEmail = user?.email ?? "";
  const personalBlockers = await getPersonalBlockersByUserEmail(userEmail);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Personal blockers</h3>
      </div>
      <Separator />
      <DateBlockerForm dateBlockers={personalBlockers} userEmail={userEmail}/>
    </div>
  );
};

export default PersonalBlockersPage;
