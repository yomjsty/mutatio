'use server'

import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

interface LogData {
    message: string
    versionId: string
}

export async function createLog({ message, versionId }: LogData) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const version = await db.version.findUnique({
        where: { id: versionId },
    })

    if (!version) {
        throw new Error('Version not found')
    }

    const log = await db.log.create({
        data: {
            message,
            versionId,
            userId: user.id,
        },
    })

    return log
}

export async function deleteLog(logId: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const log = await db.log.findUnique({
        where: { id: logId },
    })

    if (!log) throw new Error('Log not found')
    if (log.userId !== user.id) throw new Error('Unauthorized access to this log')

    await db.log.delete({
        where: { id: logId },
    })

    return { success: true }
}

export async function getAllLogs() {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const logs = await db.log.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            version: {
                select: {
                    id: true,
                    name: true,
                    projectId: true,
                },
            },
        },
    })

    return logs
}