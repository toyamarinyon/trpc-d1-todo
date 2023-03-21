import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

interface Props {
  title: string
  description: string
  onClick: () => void
}
export const Task = ({ title, description, onClick }: Props): JSX.Element => {
  return (
    <label className="flex space-x-3 cursor-pointer py-2">
      <Checkbox.Root
        className="flex h-5 w-5 appearance-none items-center justify-center rounded-full outline-none border border-whiteA9 shadow-sm text-transparent hover:text-slate-400 mt-1"
        checked
        onCheckedChange={() => onClick()}
      >
        <Checkbox.Indicator className="text-inherit">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <div>
        <h2 className="text-lg text-whiteA12">{title}</h2>
        <p className="text-sm text-whiteA11">{description}</p>
      </div>
    </label>
  )
}
