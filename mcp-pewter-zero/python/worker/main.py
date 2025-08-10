import sys, json
from models.bass_diffusion import run_bass, sweep_bass, sensitivity_bass

# In future: route to PySD if kind == 'xmile'

def main():
    line = sys.stdin.readline()
    call = json.loads(line)
    fn = call.get('fn')
    payload = call.get('payload')

    if fn == 'run_model':
        spec = payload['spec']
        params = payload['params']
        if spec['kind'] == 'python' and 'bass_diffusion' in spec['entry']:
            out = run_bass(spec, params)
            print(json.dumps(out))
            return
        raise NotImplementedError('run_model for spec kind')

    if fn == 'sweep':
        out = sweep_bass(payload['spec'], payload['grid'], payload.get('budget'))
        print(json.dumps(out))
        return

    if fn == 'sensitivity':
        out = sensitivity_bass(payload['spec'], payload['baseline'], payload.get('method','one_at_a_time'))
        print(json.dumps(out))
        return

    raise ValueError('unknown fn')

if __name__ == '__main__':
    main()