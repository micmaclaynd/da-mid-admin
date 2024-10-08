import React, { forwardRef } from 'react'

import * as styles from './block.module.scss'

export interface IBlockProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {}

const Block: React.FC<IBlockProps> = forwardRef(({ className, children, ...others }, ref) => {
    return (
        <div ref={ref} className={[styles.defaultBlock, className].join(' ')} {...others}>
            {children}
        </div>
    )
})

export default Block
