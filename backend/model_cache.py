"""
Model cache management utilities for OBrainRot.

This module provides functions to manage cached models and free up memory when needed.
"""

def clear_all_model_caches():
    """Clear all cached models to free up memory."""
    try:
        from audio import clear_tts_cache
        clear_tts_cache()
    except ImportError:
        print("Audio module not available for cache clearing")
    
    try:
        from force_alignment import clear_wav2vec_cache
        clear_wav2vec_cache()
    except ImportError:
        print("Force alignment module not available for cache clearing")
    
    try:
        from search import clear_sentiment_cache
        clear_sentiment_cache()
    except ImportError:
        print("Search module not available for cache clearing")
    
    print("All available model caches cleared.")

def get_cache_status():
    """Get the status of all cached models."""
    status = {}
    
    try:
        from audio import _tts_model
        status['tts_model'] = _tts_model is not None
    except ImportError:
        status['tts_model'] = "Module not available"
    
    try:
        from force_alignment import _wav2vec_model
        status['wav2vec_model'] = _wav2vec_model is not None
    except ImportError:
        status['wav2vec_model'] = "Module not available"
    
    try:
        from search import _sentiment_analyzer
        status['sentiment_analyzer'] = _sentiment_analyzer is not None
    except ImportError:
        status['sentiment_analyzer'] = "Module not available"
    
    return status
