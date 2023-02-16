import { getSchedule } from '../../services/schedule'
import { useEffect, useState } from 'preact/hooks'
import TableSchedule from './TableSchedule'

export function CarrouselSchedule({ class: styles }) {
  const [schedule, setShedule] = useState([])
  const [currentPlayDate, setCurrentPlayDate] = useState({})
  const [currentDay, setCurrentDay] = useState(0)

  const { playingDay, plays } = currentPlayDate

  function updateNextDay() {
    const limitNumberDay = schedule.length - 1

    let number

    if (currentDay === limitNumberDay) number = 0
    else number = currentDay + 1

    setCurrentDay(number)
    setCurrentPlayDate(schedule[number])
  }

  function updatePreviousDay() {
    const limitNumberDay = schedule.length - 1
    let number

    if (currentDay === 0) number = limitNumberDay
    else number = currentDay - 1

    setCurrentDay(number)
    setCurrentPlayDate(schedule[number])
  }

  useEffect(() => {
    async function extractSchedule() {
      const schedule = await getSchedule()

      const currentDateIndex = schedule.findIndex((playdate) => {
        return playdate.plays[0].result === 'vs'
      })

      setShedule(schedule)
      setCurrentDay(currentDateIndex - 1)
      setCurrentPlayDate(schedule[currentDateIndex - 1])
    }

    extractSchedule()
  }, [])

  return (
    <section className={` ${styles}`}>
      <header class='text-xs text-white uppercase bg-black font-bold p-3 rounded-t-xl'>
        <h2 className='text-center'>Kings League</h2>
      </header>
      <aside className='flex items-center justify-between py-4 px-4'>
        <button onClick={updatePreviousDay}>
          <img className='w-8' src='/public/arrow-left.svg' alt='icon left page' />
        </button>
        <h3 className='text-center'>{playingDay}</h3>
        <button onClick={updateNextDay}>
          <img className='w-8' src='/public/arrow-right.svg' alt='icon right page' />
        </button>
      </aside>
      <TableSchedule plays={plays} mdClass='2xl' />
    </section>
  )
}

// ;<table>
//   {currentPlayDate?.plays?.map((date) => {
//     const { result, teamOne, teamTwo } = date
//     const { name: teamOneName, teamId: teamOneId } = teamOne
//     const { name: teamTwoName, teamId: teamTwoId } = teamTwo

//     console.log(teamOneName, result, teamTwoName)

//     // const { image: teamOneImage } = await getTeam(teamOneId)
//     // const { image: teamTwoImage } = await getTeam(teamTwoId)

//     return (
//       <tr>
//         <th>{teamOneName}</th>
//         <th>img</th>
//         <th>
//           <div>{result}</div>
//         </th>
//         <th>img</th>
//         <th>{teamTwoName}</th>
//       </tr>
//     )
//   })}
// </table>
