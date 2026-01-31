import { Home, Users, Award } from 'lucide-react'
import { useStore } from '../../store/useStore'
import StatsCard from './StatsCard'

export default function StatsGrid() {
    const { getStats } = useStore()
    const stats = getStats()

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
                title="Total Households"
                value={stats.totalHouseholds}
                icon={Home}
                color="blue"
            />
            <StatsCard
                title="Total Population"
                value={stats.totalPopulation}
                icon={Users}
                color="green"
            />
            <StatsCard
                title="Schemes Available"
                value={stats.schemesCount}
                icon={Award}
                color="purple"
            />
        </div>
    )
}
