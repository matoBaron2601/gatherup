'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

interface ModalContextProps {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), [])

  const value = useMemo(() => ({
    isOpen,
    openModal,
    closeModal,
    toggleModal
  }), [isOpen, openModal, closeModal, toggleModal])

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

// Custom hook to create multiple modal contexts
export const createModalContext = () => {
  const ModalContext = createContext<ModalContextProps | undefined>(undefined)

  const ModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = useCallback(() => setIsOpen(true), [])
    const closeModal = useCallback(() => setIsOpen(false), [])
    const toggleModal = useCallback(() => setIsOpen(prev => !prev), [])

    const value = useMemo(() => ({
      isOpen,
      openModal,
      closeModal,
      toggleModal
    }), [isOpen, openModal, closeModal, toggleModal])

    return (
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
    )
  }

  const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext)
    if (context === undefined) {
      throw new Error('useModal must be used within its ModalProvider')
    }
    return context
  }

  return { ModalProvider, useModal }
}

