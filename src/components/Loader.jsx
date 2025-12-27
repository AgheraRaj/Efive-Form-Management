import { motion } from "motion/react";
import loader from "../assets/images/preloader.gif";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.img
        src={loader}
        alt="Loading..."
        className="h-16 w-16"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  )
}

export default Loader
