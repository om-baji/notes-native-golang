import React from 'react'
import Sidebar from '../components/Sidebar'
import PendingTodos from '../components/PendingTodos'
import RecentNotes from '../components/RecentNotes'

const Dashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-[18%-41%-41%] grid-flow-col">
            <Sidebar />
            <PendingTodos />
            <RecentNotes />      
        </div>
    )
}

export default Dashboard
