import { getAllTeams } from '../../services/teams'

const teams = await getAllTeams()
const teamsImages = {}

teams.forEach(({ teamId, image }) => {
  teamsImages[teamId] = image
})

const keywords = {
  'Ultimate Móstoles': 'ULT',
  '1K FC': '1K',
  'Saiyans FC': 'SAI',
  'Rayo de Barcelona': 'RDB',
  'Jijantes FC': 'JFC',
  'XBUYER TEAM': 'XBU',
  'Aniquiladores FC': 'ANI',
  'El Barrio': 'ELB',
  'Los Troncos FC': 'TFC',
  Kunisports: 'KNS',
  'PIO FC': 'PIO',
  'Porcinos FC': 'POR'
}

export default function TableSchedule({ plays, keywordClass, teamNameClass, mdClass }) {
  return (
    <table class='w-full text-sm text-gray-500 border-t border-gray-300'>
      <tbody>
        {plays?.map(({ teamOne, teamTwo, result }) => {
          const { teamId: teamIdOne, name: teamNameOne } = teamOne
          const { teamId: teamIdTwo, name: teamNameTwo } = teamTwo
          return (
            <tr class='border-b-gray-300 border-b items-center px-1 py-2 flex justify-between'>
              <td class={`min-w-[3rem] text-left ${mdClass}:pl-4 ${mdClass}:min-w-[9rem]`}>
                <div class={`${mdClass}:hidden`}>{keywords[teamNameOne]}</div>
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
                <div class={`${mdClass}:hidden`}>{keywords[teamNameTwo]}</div>
                <div class={`hidden ${mdClass}:block`}>{teamNameTwo}</div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
