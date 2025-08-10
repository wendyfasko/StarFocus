import { useState, useCallback, useRef } from 'react';

interface DragDropOptions {
  onDrop?: (draggedData: any, dropTargetIndex: number) => void;
  onDragStart?: (draggedData: any) => void;
  onDragEnd?: () => void;
  onRemove?: (index: number) => void;
  enableTouch?: boolean;
}

interface DragHandlers {
  draggable: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

interface DropHandlers {
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  onRemove?: (index: number) => void;
}

interface UseDragDropReturn {
  dragHandlers: (data: any) => DragHandlers;
  dropHandlers: (index: number) => DropHandlers;
  isDragging: boolean;
  draggedData: any;
}

export function useDragDrop(options: DragDropOptions = {}): UseDragDropReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedData, setDraggedData] = useState<any>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  // Touch handling state
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const draggedElement = useRef<HTMLElement | null>(null);
  const dragPreview = useRef<HTMLElement | null>(null);

  const {
    onDrop,
    onDragStart,
    onDragEnd,
    onRemove,
    enableTouch = true
  } = options;

  const createTouchPreview = useCallback((element: HTMLElement, x: number, y: number) => {
    if (dragPreview.current) {
      document.body.removeChild(dragPreview.current);
    }

    const preview = element.cloneNode(true) as HTMLElement;
    preview.style.position = 'fixed';
    preview.style.left = `${x - 32}px`;
    preview.style.top = `${y - 32}px`;
    preview.style.width = '64px';
    preview.style.height = '64px';
    preview.style.zIndex = '9999';
    preview.style.pointerEvents = 'none';
    preview.style.opacity = '0.8';
    preview.style.transform = 'rotate(5deg) scale(1.1)';
    preview.style.transition = 'none';
    
    document.body.appendChild(preview);
    dragPreview.current = preview;
  }, []);

  const removeTouchPreview = useCallback(() => {
    if (dragPreview.current) {
      document.body.removeChild(dragPreview.current);
      dragPreview.current = null;
    }
  }, []);

  const getElementUnderTouch = useCallback((x: number, y: number) => {
    const elements = document.elementsFromPoint(x, y);
    return elements.find(el => el.hasAttribute('data-drop-zone'));
  }, []);

  const dragHandlers = useCallback((data: any): DragHandlers => {
    const handlers: DragHandlers = {
      draggable: true,
      onDragStart: (e: React.DragEvent) => {
        setIsDragging(true);
        setDraggedData(data);
        e.dataTransfer.setData('text/plain', JSON.stringify(data));
        e.dataTransfer.effectAllowed = 'move';
        
        // Set custom drag image
        const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
        dragImage.style.transform = 'rotate(5deg) scale(1.1)';
        dragImage.style.opacity = '0.8';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 32, 32);
        setTimeout(() => document.body.removeChild(dragImage), 0);
        
        onDragStart?.(data);
      },
      onDragEnd: (e: React.DragEvent) => {
        setIsDragging(false);
        setDraggedData(null);
        setDragOverIndex(null);
        onDragEnd?.();
      }
    };

    if (enableTouch) {
      handlers.onTouchStart = (e: React.TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        touchStartPos.current = { x: touch.clientX, y: touch.clientY };
        draggedElement.current = e.currentTarget as HTMLElement;
        setDraggedData(data);
      };

      handlers.onTouchMove = (e: React.TouchEvent) => {
        e.preventDefault();
        if (!touchStartPos.current || !draggedElement.current) return;

        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
        const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);

        // Start dragging if moved enough
        if ((deltaX > 10 || deltaY > 10) && !isDragging) {
          setIsDragging(true);
          createTouchPreview(draggedElement.current, touch.clientX, touch.clientY);
          onDragStart?.(data);
        }

        if (isDragging && dragPreview.current) {
          dragPreview.current.style.left = `${touch.clientX - 32}px`;
          dragPreview.current.style.top = `${touch.clientY - 32}px`;
        }
      };

      handlers.onTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        if (isDragging) {
          const touch = e.changedTouches[0];
          const elementUnder = getElementUnderTouch(touch.clientX, touch.clientY);
          
          if (elementUnder) {
            const dropIndex = parseInt(elementUnder.getAttribute('data-drop-index') || '0');
            onDrop?.(data, dropIndex);
          }

          removeTouchPreview();
          setIsDragging(false);
          setDraggedData(null);
          onDragEnd?.();
        }
        
        touchStartPos.current = null;
        draggedElement.current = null;
      };
    }

    return handlers;
  }, [isDragging, enableTouch, createTouchPreview, removeTouchPreview, getElementUnderTouch, onDrop, onDragStart, onDragEnd]);

  const dropHandlers = useCallback((index: number): DropHandlers => {
    const handlers: DropHandlers = {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        try {
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
          onDrop?.(data, index);
        } catch (error) {
          // Fallback for simple string data
          const data = e.dataTransfer.getData('text/plain');
          onDrop?.(data, index);
        }
        setDragOverIndex(null);
      },
      onDragEnter: (e: React.DragEvent) => {
        e.preventDefault();
        setDragOverIndex(index);
      },
      onDragLeave: (e: React.DragEvent) => {
        e.preventDefault();
        // Only clear if we're actually leaving the drop zone
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          setDragOverIndex(null);
        }
      },
      onRemove: onRemove
    };

    // Add touch support for drop zones
    if (enableTouch) {
      handlers.onTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        // This is handled in the drag element's touch end
      };
    }

    return handlers;
  }, [onDrop, onRemove, enableTouch]);

  return {
    dragHandlers,
    dropHandlers,
    isDragging,
    draggedData
  };
}
