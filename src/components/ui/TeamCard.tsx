const TeamCard = () => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5">
      <div className="flex flex-col">
        <h1 className="text-sm font-medium text-black/70">TOTAL MEMBERS</h1>
        <div className="flex items-end gap-3">
          <h2 className="text-5xl font-bold">42</h2>
          <p className="text-[#4F46E5] font-bold text-xs">+3 this week</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
