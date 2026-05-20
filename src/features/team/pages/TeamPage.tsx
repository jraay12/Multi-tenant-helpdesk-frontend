import { useState } from "react";
import TeamCard from "../../../components/ui/TeamCard";
import TeamTable from "../../../components/ui/TeamTable";
import InviteTeamModal from "../../../components/ui/InviteTeamModal";

const TeamPage = () => {
  const [isInviteModal, setIsInviteModal] = useState(false);
  return (
    <div className="p-7 bg-[#F6F7F9] min-h-screen overflow-scroll max-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        <TeamCard growthText="this week" count={42} growthValue={3} title="TOTAL MEMBERS"/>
        <TeamCard growthText="utilization" count={38} growthValue={90} title="ACTIVE AGENTS"/>
        <TeamCard growthText="expiring soon" count={4} title="PENDING INVITES"/>
      </div>
      <TeamTable onInvite={() => setIsInviteModal(true)} />

      {isInviteModal && (
        <InviteTeamModal
          isOpen={isInviteModal}
          onClose={() => setIsInviteModal(false)}
        />
      )}
    </div>
  );
};

export default TeamPage;
