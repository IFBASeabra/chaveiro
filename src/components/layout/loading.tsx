import { Loader2Icon } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex items-center text-center justify-center min-h-[90vh]">
      <Loader2Icon size={48} className='animate-spin'/>
    </div>
  )
}

export default Loading