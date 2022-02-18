namespace scene {
    //% block="start $effect effect at $location|| for $duration ms"
    //% location.shadow=variables_get
    //% location.defl=location
    //% duration.shadow=timePicker
    export function createParticleEffectAtLocation(location: tiles.Location, effect: effects.ParticleEffect, duration?: number) {
        effect.start(location, duration, 5)
    }

    //% block="clear all effects at $location"
    //% location.shadow=variables_get
    //% location.defl=location
    export function clearParticleEffectsAtLocation(location: tiles.Location) {
        const sources = game.currentScene().particleSources;
        if (!sources) return;
        sources
            .filter(ps => ps.anchor.x === location.x && ps.anchor.y === location.y)
            .forEach(ps => ps.destroy());
    }
}
