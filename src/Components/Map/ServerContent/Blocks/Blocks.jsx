import s from "./Blocks.module.css"

const Blocks = () => {
     return (
          <div className={s.blocks}>
                    <div className={s.block}>1</div>
                    <div className={s.block}>2</div>
                    <div className={s.block}>3</div>
                    <div className={s.block}>4</div>
               </div>
     )
}

export default Blocks