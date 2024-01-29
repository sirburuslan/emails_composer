/**
 * @file Ai
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the types for all ai resources
 */

// Type for the ai suggestion
export type ai_suggestion_type = {
    name: string,
    command: string
}

// Type for the ai services
export type ai_service_type = {
    name: string,
    slug: string
}