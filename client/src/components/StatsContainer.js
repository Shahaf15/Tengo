import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
    const { stats } = useAppContext()

    const defaultStats = [
        {
            title: 'open advertises',
            count: stats.Open || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7',
        },
        {
            title: 'close advertises',
            count: stats.Close || 0,
            icon: <FaCalendarCheck />,
            color: '#842029',
            bcg: '#f8d7da',
        },
    ]

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default StatsContainer
