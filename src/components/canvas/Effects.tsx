import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function Effects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  );
}
