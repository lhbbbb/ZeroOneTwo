from konlpy.tag import Mecab
import numpy as np
import mxnet as mx
import json

from . import embedding_maker
from . import model


mecab = Mecab()


def enko_translation(eng_sent):
    embed_weights  = embedding_maker.load_embedding("en_ko.np")
    vocab_size = embed_weights.shape[0]
    embed_dim = embed_weights.shape[1]
    max_seq_length = 30  # you can change this var.
    n_hidden=384  # also same.
    ctx = mx.cpu(0)
    w2idx, idx2w = embedding_maker.load_vocab("en_ko.dic")
    end_idx = w2idx['END']

    enko_model = model.english_korean_translator(n_hidden, vocab_size, embed_dim, max_seq_length, end_idx, attention=True)
    enko_model.cast('float32')
    enko_model.collect_params().initialize(mx.init.Xavier(), ctx=ctx)

    enko_model.load_parameters("en_ko_mdl_10.params", ctx=ctx)
    kor_seq, _  = enko_model.calculation(eng_sent, en_dict=w2idx, ko_dict=w2idx, ko_rev_dict=idx2w, ctx=ctx)
    return (kor_seq)
        
