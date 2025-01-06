'use client';

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FavoritePromptsDrawerProps {
    favoritePrompts: string[];
    handleDeleteFavoritePrompt: (prompt: string) => void;
    onUsePrompt: (prompt: string) => void;
}

export function FavoritePromptsDrawer({
    favoritePrompts,
    handleDeleteFavoritePrompt,
    onUsePrompt
}: FavoritePromptsDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPrompts = useMemo(() => {
        if (!searchQuery.trim()) return favoritePrompts;
        return favoritePrompts.filter(prompt =>
            prompt.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [favoritePrompts, searchQuery]);

    return (
        <div className="fixed left-0 top-[11rem] z-30">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={`flex flex-col items-center gap-2 py-3 h-auto
            border-l-0 rounded-l-none border-2
            bg-gradient-to-r from-emerald-200 to-green-200
            hover:from-emerald-300 hover:to-green-300
            dark:from-emerald-900 dark:to-green-900
            dark:hover:from-emerald-800 dark:hover:to-green-800
            transition-all duration-300 shadow-md
            hover:shadow-lg hover:scale-105
            ${favoritePrompts.length > 0 ? 'ring-2 ring-emerald-500 dark:ring-emerald-400' : ''}`}
                    >
                        <div className="relative">
                            <Star className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                            {favoritePrompts.length > 0 && (
                                <div className="absolute -top-1 -right-2.5 w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
                            )}
                        </div>
                        <span
                            className="text-base font-medium bg-gradient-to-b from-emerald-500 to-green-500 
                dark:from-emerald-400 dark:to-green-400 
                text-transparent bg-clip-text"
                            style={{ writingMode: 'vertical-rl' }}
                        >
                            {isOpen ? 'Close' : 'Prompts'}
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    className="w-[400px] fixed left-0 h-[calc(100vh-8rem)] mt-[2rem] p-4 flex flex-col slide-in-from-left rounded-r-xl"
                >
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                            <span className="bg-gradient-to-r from-emerald-500 to-green-500 
        dark:from-emerald-400 dark:to-green-400 
        text-transparent bg-clip-text font-semibold">
                                Favorite Prompts ({favoritePrompts.length})
                            </span>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="relative mt-4">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search prompts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>

                    <ScrollArea className="flex-1 mt-4 pr-4">
                        <div className="space-y-3">
                            {filteredPrompts.length > 0 ? (
                                filteredPrompts.map((prompt, index) => (
                                    <TooltipProvider key={index} delayDuration={300}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className="group relative p-4 rounded-lg border border-gray-200 
                                                        dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 
                                                        transition-all duration-200"
                                                >
                                                    {/* Preview text with truncation */}
                                                    <div
                                                        className="cursor-pointer mb-8"
                                                        onClick={() => onUsePrompt(prompt)}
                                                    >
                                                        <p className="text-sm line-clamp-2 pr-8">
                                                            {prompt}
                                                        </p>

                                                        {/* Character count badge */}
                                                        <div className="absolute top-2 right-2 text-xs text-gray-500 
                                                            dark:text-gray-400 bg-gray-100 dark:bg-gray-700 
                                                            px-1.5 py-0.5 rounded-full">
                                                            {prompt.length}c
                                                        </div>
                                                    </div>

                                                    {/* Action buttons */}
                                                    <div className="absolute right-2 bottom-3 flex gap-1 
                                                        opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onUsePrompt(prompt)}
                                                            className="h-7 px-2 text-xs hover:bg-green-100 
                                                                dark:hover:bg-green-900/30 text-green-600 
                                                                dark:text-green-400"
                                                        >
                                                            Use
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteFavoritePrompt(prompt);
                                                            }}
                                                            className="h-7 px-2 text-xs hover:bg-red-100 
                                                                dark:hover:bg-red-900/30 text-red-600 
                                                                dark:text-red-400"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="right"
                                                className="max-w-[300px] p-3 text-xs"
                                            >
                                                <p className="whitespace-pre-wrap">{prompt}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                    {searchQuery ? 'No matching prompts found' : 'No favorite prompts yet'}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
}