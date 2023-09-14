import { motion } from "framer-motion";
import { ReactComponent as ExclamationIcon } from "src/assets/exclamation-circle.svg";


export const InputError = ({ message, classNames, style }: { message: string, classNames?: string, style?: any }) => {
  const framerError = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  }
  return (
    <motion.p
      className={`flex items-center gap-1 px-3 font-semibold text-rose-500 bg-black border border-solid border-red-500 rounded-md w-max ${classNames}`}
      style={{ ...style }}
      {...framerError}
    >
      <ExclamationIcon fill="rgb(239 68 68 )" width={"24px"} style={{ "minWidth": "24px" }} className="m-0.5" />
      {message}
    </motion.p>
  )
}