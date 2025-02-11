'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { DayBlockerType } from '@/types/dayBlocker'
import { Mode } from './eventCalendar'


export type EventSideBarProps = {
  activeMode: Mode
  onModeClick: (mode: Mode) => void
  onSubmit?: () => void
  onIntegrateWithDateBlockers?: () => void
}

const EventSideBar = ({ activeMode, onModeClick, onSubmit, onIntegrateWithDateBlockers }: EventSideBarProps) => {
  const modes: { label: string; mode: Mode; color: string }[] = [
    { label: 'Available', mode: '0', color: 'bg-green-400 hover:bg-green-600' },
    { label: 'Maybe', mode: '50', color: 'bg-orange-400 hover:bg-orange-600' },
    { label: 'Unavailable', mode: '100', color: 'bg-red-400 hover:bg-red-600' }
  ]

  return (
    <Card className='h-full sm:min-w-[350px]'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg font-bold text-primary'>Select mode</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex flex-col gap-2'>
          {modes.map(({ label, mode, color }) => (
            <Button
              key={mode}
              variant={activeMode === mode ? 'default' : 'outline'}
              className={`justify-start ${activeMode === mode ? color : ''}`}
              onClick={() => onModeClick(mode)}
            >
              <div className={`mr-2 h-4 w-4 rounded-full border ${color.split(' ')[0]}`} />
              {label}
            </Button>
          ))}
        </div>

        <Separator className='!my-4' />

        <Button className='!mt-0 w-full' variant='outline' onClick={onIntegrateWithDateBlockers}>
          Integrate with my date blockers
        </Button>
        <Button className='w-full bg-green-500 font-bold text-white hover:bg-green-600' onClick={onSubmit}>
          Submit calendar
        </Button>
      </CardContent>
    </Card>
  )
}

export default EventSideBar
