import { createClient } from '@liveblocks/client'
import { LiveblocksProvider, RoomProvider } from '@liveblocks/react'
import { Tldraw, TldrawApp, useFileSystem } from '@tldraw/tldraw'
import { useMultiplayerState } from 'hooks/useMultiplayerState'
import React, { FC } from 'react'
import { styled } from 'styles'

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY || '',
  throttle: 80,
})

interface Props {
  roomId: string
}

const MultiplayerEditor: FC<Props> = ({
  roomId,
}: {
  roomId: string
}) => {
  return (
    <LiveblocksProvider client={client}>
      <RoomProvider id={roomId}>
        <Editor roomId={roomId} />
      </RoomProvider>
    </LiveblocksProvider>
  )
}

// Inner Editor

function Editor({ roomId }: Props) {
  const fileSystemEvents = useFileSystem()
  const { error, ...events } = useMultiplayerState(roomId)

  if (error) return <LoadingScreen>Error: {error.message}</LoadingScreen>

  return (
    <div className="tldraw">
      <Tldraw
        autofocus
        disableAssets
        showPages={false}
        {...fileSystemEvents}
        {...events}
      />
    </div>
  )
}

export default MultiplayerEditor

const LoadingScreen = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
