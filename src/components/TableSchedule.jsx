import { getAllTeams } from '../../services/teams'

const teams = await getAllTeams()
const teamsImages = {}
const teamsMinified = {}

teams.forEach(({ teamId, image, minifiedName }) => {
  teamsImages[teamId] = image
  teamsMinified[teamId] = minifiedName
})

export default function TableSchedule({ plays, mdClass }) {
  return (
    <table class='w-full text-sm text-gray-500 border-t border-gray-300'>
      <tbody>
        {plays?.map(({ teamOne, teamTwo, result }) => {
          const { teamId: teamIdOne, name: teamNameOne } = teamOne
          const { teamId: teamIdTwo, name: teamNameTwo } = teamTwo
          return (
            <tr class='border-b-gray-300 border-b items-center px-1 py-2 flex justify-between'>
              <td class={`min-w-[3rem] text-left ${mdClass}:pl-4 ${mdClass}:min-w-[9rem]`}>
                <div class={`${mdClass}:hidden`}>{teamsMinified[teamIdOne]}</div>
                <div class={`hidden ${mdClass}:block`}>{teamNameOne}</div>
              </td>
              <td class='w-1/5 flex justify-center'>
                <img class='w-10 block' src={teamsImages[teamIdOne]} />
              </td>
              <td class='w-full text-center py-2 mx-4 rounded-md text-white bg-gradient-to-b from-[#2bc7ff] via-[#09f] to-[#2bc7ff]'>
                <div class=''>{result}</div>
              </td>
              <td class='w-1/5 flex justify-center'>
                <img class='w-10 block' src={teamsImages[teamIdTwo]} />
              </td>
              <td class={`min-w-[3rem] text-right ${mdClass}:pr-4  ${mdClass}:min-w-[9rem]`}>
                <div class={`${mdClass}:hidden`}>{teamsMinified[teamIdTwo]}</div>
                <div class={`hidden ${mdClass}:block`}>{teamNameTwo}</div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
