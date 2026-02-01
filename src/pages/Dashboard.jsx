import StatsGrid from '../components/dashboard/StatsGrid'
import HouseholdTable from '../components/households/HouseholdTable'

export default function Dashboard() {
    return (
        <div className="space-y-4 sm:space-y-6 mt-16 md:mt-0">
            <StatsGrid />
            <HouseholdTable />
        </div>
    )
}
