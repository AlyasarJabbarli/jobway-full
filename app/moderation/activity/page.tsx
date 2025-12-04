import { ModerationLayout } from "@/components/moderation/moderation-layout";
import { getCurrentModerator, getModerationStats } from "@/lib/moderation-data";
import ActivityClient from "./ActivityClient";

export default async function ModerationActivityPage() {
  const moderator = await getCurrentModerator();
  const stats = await getModerationStats();
  const safeModerator = {
    ...moderator,
    name: moderator.name ?? 'Moderator',
    isActive: typeof moderator.isActive === 'boolean' ? moderator.isActive : true,
  };

  return (
    <ModerationLayout moderator={safeModerator} stats={stats}>
      <ActivityClient />
    </ModerationLayout>
  );
}
