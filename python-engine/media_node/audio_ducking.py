from pydub import AudioSegment

def apply_background_ducking(original_audio_path: str, tts_path: str, start_ms: int, output_path: str):
    bg = AudioSegment.from_file(original_audio_path)
    tts = AudioSegment.from_file(tts_path)
    end_ms = start_ms + len(tts)
    
    before = bg[:start_ms]
    during = bg[start_ms:end_ms] - 15
    after = bg[end_ms:]
    
    final_bg = before + during + after
    final_mix = final_bg.overlay(tts, position=start_ms)
    final_mix.export(output_path, format="wav")
    print(f"[+] Hoàn tất xử lý Audio Ducking: {output_path}")
