import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Adv from './Adv'
import Wrapper from '../assets/wrappers/AdvsContainer'

const AdvsContainer = () => {
    const { getAdvs, advs, isLoading, page, totalAdvs } = useAppContext()

    useEffect(() => {
        getAdvs()
    }, [])
    if (isLoading) {
        return <Loading center />
    }

    if (advs.length === 0) {
        return (
            <Wrapper>
                <h2>
                    No food advertises to display...
                </h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h5>
                {totalAdvs} food advertise{advs.length > 1 && 's'} found
            </h5>
            <div className="advs">
                {advs.map((adv) => {
                  return <Adv key={adv._id} {...adv} />
                })}
            </div>
            {/* pagination buttons */}
        </Wrapper>
    )
}

export default AdvsContainer