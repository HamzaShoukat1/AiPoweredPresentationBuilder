import { createServerFn } from "@tanstack/react-start";
import { createPresentationInputSchema, presentationIdInputSchema, updatePresentationInputSchema, } from "../types/schema"
import { authFnMiddleware } from "#/middleware/auth";
import { generateSlug } from "random-word-slugs"
import { prisma } from "#/lib/db";
import { PresentationStatus } from "#/generated/prisma/enums";
export const createPresentation = createServerFn({ method: "POST" }).inputValidator((data: unknown) => createPresentationInputSchema.parse(data)).middleware([authFnMiddleware]).handler(async ({ data, context }) => {
    const userId = context.session.user.id
    const presentation = await prisma.presentation.create({
        data: {
            userId,
            title: generateSlug(3),
            prompt: data.prompt,
            slideCount: data.slideCount,
            style: data.style,
            tone: data.tone,
            layout: data.layout,
            status: PresentationStatus.COMPLETED
        }

    });
    return presentation
    //todo inngest

});


export const updatePresentation = createServerFn({ method: "POST" }).inputValidator((data: unknown) => updatePresentationInputSchema.parse(data)).middleware([authFnMiddleware]).handler(async ({ data, context }) => {
    const userId = context.session.user.id
    const { id, ...patch } = data
    const existPresentation = await prisma.presentation.findFirst({
        where: { id, userId }
    });
    if (!existPresentation) throw new Error("Presentation not found")
    const updateData = patch
    return prisma.presentation.update({
        where: { id },
        data: updateData
    })


});
export const deletePresentation = createServerFn({ method: "POST" }).inputValidator((data: unknown) => presentationIdInputSchema.parse(data)).middleware([authFnMiddleware]).handler(async ({ data, context }) => {
    const userId = context.session.user.id
    const { id } = data
    const existPresentation = await prisma.presentation.findFirst({
        where: { id, userId }
    });
    if (!existPresentation) throw new Error("Presentation not found")
    const deletedPresentation = await prisma.presentation.delete({
        where: { id }
    })
    return deletedPresentation



});



export const regeneratePresentation = createServerFn({ method: "POST" }).inputValidator((data: unknown) => presentationIdInputSchema.parse(data)).middleware([authFnMiddleware]).handler(async ({ data, context }) => {
    const userId = context.session.user.id
    const { id } = data
    const existPresentation = await prisma.presentation.findFirst({
        where: { id, userId }
    });
    if (!existPresentation) throw new Error("Presentation not found")
    const updatedPresentation = await prisma.presentation.update({
        where: { id },
        data: {
            status: PresentationStatus.GENERATING
        }
    })
    return updatedPresentation

    //todo inngest

});
