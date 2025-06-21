
import { TrendingUp, DollarSign, Clock, Target, Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Proposal {
  id: number;
  status: "pending" | "accepted" | "rejected" | "interview" | "withdrawn";
  bidAmount: string;
  submittedDate: string;
  jobType: "fixed" | "hourly";
}

interface ProposalStatsProps {
  proposals: Proposal[];
}

const ProposalStats = ({ proposals }: ProposalStatsProps) => {
  // Calculate statistics
  const totalProposals = proposals.length;
  const acceptedProposals = proposals.filter(p => p.status === "accepted").length;
  const pendingProposals = proposals.filter(p => p.status === "pending").length;
  const interviewProposals = proposals.filter(p => p.status === "interview").length;
  
  const successRate = totalProposals > 0 ? ((acceptedProposals / totalProposals) * 100).toFixed(1) : "0";
  
  // Calculate potential earnings (sum of accepted + interview proposals)
  const potentialEarnings = proposals
    .filter(p => p.status === "accepted" || p.status === "interview")
    .reduce((sum, proposal) => {
      const amount = parseFloat(proposal.bidAmount.replace(/[$,/hour]/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

  // Recent activity (proposals in last 7 days)
  const recentActivity = proposals.filter(p => {
    const proposalDate = new Date(p.submittedDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return proposalDate >= weekAgo;
  }).length;

  const stats = [
    {
      title: "Total Proposals",
      value: totalProposals.toString(),
      change: `+${recentActivity} this week`,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      change: acceptedProposals > 0 ? `${acceptedProposals} accepted` : "No accepted yet",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Pending",
      value: pendingProposals.toString(),
      change: "Awaiting response",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Interviews",
      value: interviewProposals.toString(),
      change: "Scheduled",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Potential Earnings",
      value: `$${potentialEarnings.toLocaleString()}`,
      change: "From active proposals",
      icon: DollarSign,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      title: "This Month",
      value: recentActivity.toString(),
      change: "New proposals",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className={`text-xs mt-1 ${stat.color}`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProposalStats;
